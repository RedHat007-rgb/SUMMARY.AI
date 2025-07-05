import { useSignupForm } from "../utils/signupSchema";

const Signup = () => {
  const {
    email,
    setEmail,
    password,
    setPasword,
    firstName,
    setfirstName,
    lastName,
    setlastName,
    data,
    error,
    onSubmitHandler,
  } = useSignupForm();

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          type="text"
          value={firstName}
          onChange={(e) => {
            setfirstName(e.target.value);
          }}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => {
            setlastName(e.target.value);
          }}
          placeholder="Last Name"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPasword(e.target.value);
          }}
          placeholder="Password"
        />
        <button>Signup</button>
      </form>

      {Array.isArray(error) ? (
        error.map((error, index) => <div key={index}> {error}</div>)
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>{data}</>
      )}
    </div>
  );
};

export default Signup;
