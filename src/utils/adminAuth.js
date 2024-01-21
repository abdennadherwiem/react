const adminAuth = (WrappedComponent) => {
    const AuthenticatedComponent = (props) => {
      const token = localStorage.getItem("token");
      const userType = localStorage.getItem("userType");
  
      if (token && userType && userType.toLowerCase() === 'true') {
        return <WrappedComponent {...props} />;
      } else {
        console.log("Access denied");
        localStorage.removeItem('token');
        localStorage.removeItem('userType')    
        window.location.href = "/AccessDeniedPage";
        return null;
      }
    };
  
    return AuthenticatedComponent;
  };
  
  export default adminAuth;
  