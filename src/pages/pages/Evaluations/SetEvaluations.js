import React, { useState, useEffect } from 'react';
import RegisterForm from "../RegisterForm/RegisterForm";
import { CircularProgress,Grid} from '@material-ui/core';
import ExistingEvaluations from './ExistingEvaluations';
import CreateEvaluation from './CreateEvaluation';
import { TaskSequencesService } from '../../../services/TaskSequencesService';
import CardContainer from '../../../components/CardContainer';
import Typography from '@material-ui/core/Typography';
import ButtonWithStyles from '../../../components/ButtonWithStyles';
import DeleteDialog from './DeleteDialog';
import { set } from 'date-fns';

function SetEvaluations() {
  const [loading, setLoading] = useState(true);
  const [existingEvaluations, setExistingEvaluations] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState('');
  const [enEvaluationName, setEnEvaluationName] = useState('');
  const [esEvaluationName, setEsEvaluationName] = useState('');
  const [deps, setDeps] = useState();
  const [onEdit, setOnEdit] = useState(false);
  const [evalOnEdition, setEvalOnEdition] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSelectChange = (event) => {
    setSelectedEvaluation(event);
  };

  useEffect(() => {
    TaskSequencesService.list()
      .then(response => {
        setExistingEvaluations(response.existing_evaluations);
        setTasks(response.tasks);
        setOnEdit(false);
        setEvalOnEdition(null);
        setEnEvaluationName('');
        setEsEvaluationName('');
        setSelectedTasks([]);
        setLoading(false);
      })
      .catch(() => {
        setTimeout(true);
      });
  }, [deps]);

  const handleDeleteEvaluation = () => {
    if (selectedEvaluation !== undefined) {
      const evaluation = existingEvaluations[selectedEvaluation];
      evaluation.hide = 1;

      TaskSequencesService.set(selectedEvaluation, evaluation).then(response => {
        setDeps(response);
        setSelectedEvaluation('');
        setOpen(false);
      })
      .catch(() => {
        setTimeout(true);
      });
    }
  }
  const handleEditEvaluation = () => {
    if (selectedEvaluation !== undefined) {
      setOnEdit(true);
      setEvalOnEdition(selectedEvaluation);
      setEnEvaluationName(existingEvaluations[selectedEvaluation].name.en);
      setEsEvaluationName(existingEvaluations[selectedEvaluation].name.es);
      setSelectedTasks(existingEvaluations[selectedEvaluation].list);
      window.scroll(0, document.body.scrollHeight);
    }
  }
  const handleAddEvaluation = () => {
    if (evalOnEdition !== '') {
      const evaluation = {
        name: {
          en: enEvaluationName,
          es: esEvaluationName,
        },
        list: selectedTasks,
      }
      const id = onEdit ? evalOnEdition : 0;
      TaskSequencesService.set(id, evaluation).then(response => {
          setDeps(response);
        })
        .catch(() => {
          setTimeout(true);
        });
    }
  }

  const handleCancelCreate = () => {
    if(onEdit){
      setOnEdit(false);
      setEvalOnEdition(null);
    }
    setEnEvaluationName('');
    setEsEvaluationName('');
    setSelectedTasks([]);
  }

  const handleTaskCheck = (taskKey) => { 
    setSelectedTasks(prevTasks => {
      if (prevTasks.includes(taskKey)) {
        // If taskKey is already in the list, remove it
        return prevTasks.filter(task => task !== taskKey);
      } else {
        // If taskKey is not in the list, add it
        return [...prevTasks, taskKey];
      }
    });
  };

  return (
    <React.Fragment>
      <RegisterForm title={'Institution Evaluations'}>
      <DeleteDialog 
        handleClose={() => setOpen(false)}
        open={open}
        handleDelete={() => handleDeleteEvaluation()}
        evaluation={existingEvaluations[selectedEvaluation]?.name?.en}
      />
      {!loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Grid container spacing={5} style={{ flexGrow: 1, marginBottom: '10px' }} >
            <Grid item xs={window.innerWidth > 1200 ? 8 : 12}>
              <ExistingEvaluations
                selectedEvaluation={selectedEvaluation} 
                existingEvaluations={existingEvaluations} 
                handleSelectChange={handleSelectChange}
                handleAddEvaluation={handleEditEvaluation}
                institutionEvaluations={[]}
                onEdit={onEdit}
                label={'Edit Evaluation'}
                selectWidth={6}
              />
            </Grid>
            {window.innerWidth > 1200 && (
              <Grid item sm={4} xs={12}>
                <CardContainer title={selectedEvaluation !== '' ? existingEvaluations[selectedEvaluation].name.en : ""}>
                  {selectedEvaluation !== '' && 
                    existingEvaluations[selectedEvaluation].list.map((item, index) => {
                      return( <Typography key={index} variant="body2" gutterBottom style={{ paddingLeft: 4 }}>
                                {index + 1}. {tasks[item]}
                              </Typography>
                            )})
                  }
                  {selectedEvaluation !== '' && 
                    <Grid xs={12}>
                      <ButtonWithStyles 
                        className={"delete"}
                        variant="outlined"
                        color="delete"
                        fullwidth
                        onClick={() => setOpen(true)}
                      > 
                        Delete
                      </ButtonWithStyles>
                    </Grid>
                  }
                  </CardContainer>
              </Grid>
            )}
          </Grid>
          <CreateEvaluation
            setEnEvaluationName={setEnEvaluationName}
            enEvaluationName={enEvaluationName}
            esEvaluationName={esEvaluationName}
            setEsEvaluationName={setEsEvaluationName}
            selectedTasks={selectedTasks}
            handleTaskCheck={handleTaskCheck}
            handleCreateEvaluation={handleAddEvaluation}
            handleCancelCreate={handleCancelCreate}
            tasks={tasks}
            onEdit={onEdit}
          />
        </div>
      ) : (
        <Grid container justify="center">
          <Grid item style={{ paddingTop: '10%', paddingBottom: '5%' }}>
            <CircularProgress alt={'loading..'} />
          </Grid>
        </Grid>
      )}
    </RegisterForm>
  </React.Fragment>
  );
}

export default SetEvaluations;
