import React, { useState, useEffect } from 'react';

const Preloader = ({ onLoaded }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setLoading(false);
      if (onLoaded) {
        onLoaded();
      }
    }, 3000); // Simulate loading time (3 seconds)

    return () => clearTimeout(loadTimeout);
  }, [onLoaded]);

  if (!loading) return null;

  return (
    <div className="preloader">
      <pre>
        &nbsp;&nbsp;&nbsp;&nbsp;^5###########?<br />
        &nbsp;&nbsp;^5&amp;@@@@@@@@@@@@J<br />
        ~P@@@@@@@@@@@@@@@J<br />
        #@@@@@@&amp;BBBBBBBBBP??????!<br />
        B@@@@@@B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.&amp;@@@@@@G<br />
        B@@@@@@B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.&amp;@@@@@@P<br />
        &nbsp;&nbsp;&nbsp;...Loading...
      </pre>
    </div>
  );
};

export default Preloader;