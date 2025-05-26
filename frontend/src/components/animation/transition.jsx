import { motion } from 'framer-motion';

// Enhanced fade transition with subtle Y movement for elegance
export const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  },
};

// Enhanced slide with improved easing
export const slideIn = {
  hidden: { x: '-30%', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  },
  exit: { 
    x: '30%', 
    opacity: 0,
    transition: {
      duration: 0.35,
      ease: [0.36, 0, 0.66, -0.56]
    }
  },
};

// Enhanced scale animation with slight rotation for added depth
export const scaleUp = {
  hidden: { scale: 0.85, opacity: 0, rotate: -2 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    rotate: 0,
    transition: {
      duration: 0.4,
      ease: [0, 0, 0.2, 1.1]
    }
  },
  exit: { 
    scale: 0.85, 
    opacity: 0,
    rotate: 2,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1]
    }
  },
};

// Staggered item animation for lists and grids
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

// Child item animation for staggered animations
export const staggerItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  },
  exit: {
    y: -15,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.36, 0, 0.66, -0.56]
    }
  }
};

// Professional card hover effect
export const cardHover = {
  rest: { 
    scale: 1, 
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  hover: { 
    scale: 1.03, 
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Smooth page transitions
export const pageTransition = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

// Form field focus animation
export const formFieldFocus = {
  rest: { scale: 1 },
  focus: { 
    scale: 1.01,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

// Button click feedback
export const buttonTap = {
  tap: { 
    scale: 0.97,
    transition: {
      duration: 0.1
    }
  }
};

// Default transition settings
export const transition = {
  duration: 0.45,
  ease: [0.4, 0, 0.2, 1],
};

// Use this wrapper to apply transitions
export const MotionWrapper = ({ children, variants, className, ...props }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants || fadeIn}
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
