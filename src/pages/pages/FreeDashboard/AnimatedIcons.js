import { motion } from 'framer-motion';

const iconVariants = {
  float: {
    y: [0, -10, 0], // Float up and down
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const AnimatedIcons = ({ src, alt }) => (
  <motion.div
    variants={iconVariants}
    animate="float"
    style={{
      width: 64,
      height: 64,
      margin: '0 10px',
    }}
  >
    <img src={src} alt={alt} style={{ width: '100%', height: '100%' }} />
  </motion.div>
);