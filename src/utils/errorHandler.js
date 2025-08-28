// Global error handling and performance monitoring
export const handleError = (error, context = 'Unknown') => {
  // In production, you'd send this to an error tracking service
  console.error(`Error in ${context}:`, error);
  
  // Could integrate with services like Sentry, LogRocket, etc.
  if (process.env.NODE_ENV === 'production') {
    // window.gtag?.('event', 'exception', {
    //   description: error.message,
    //   fatal: false
    // });
  }
};

export const logPerformance = (label, startTime) => {
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  if (duration > 1000) { // Log if operation takes more than 1 second
    console.warn(`Performance warning: ${label} took ${duration.toFixed(2)}ms`);
  }
};

export const withErrorBoundary = (Component) => {
  return function ErrorBoundaryWrapper(props) {
    try {
      return <Component {...props} />;
    } catch (error) {
      handleError(error, Component.name);
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h3>Something went wrong</h3>
          <p>Please refresh the page or contact support if the issue persists.</p>
        </div>
      );
    }
  };
};