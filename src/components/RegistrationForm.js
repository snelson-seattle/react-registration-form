import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// username must be 4-24 characters long and must start with a letter
// and can only contain letters or numbers
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

// password field must be 8-24 characters long and must contain a
// lowercase letter, uppercase letter, number, and special character
// from the given set
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const RegistrationForm = () => {
  const userRef = useRef();
  const errRef = useRef();

  // username field states
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // password field states
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // password confirmation field states
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // error and success field states
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button gets enabled via JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    // Add backend submission logic here
  };

  return (
    <section className="bg-black/40 flex flex-col justify-start p-4 w-full max-w-[420px] min-h-[400px]">
      <p
        ref={errRef}
        className={errMsg ? "errMsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="text-[32px]">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-evenly grow pb-4"
      >
        {/* USERNAME LABEL AND FIELD*/}
        <label htmlFor="username" className="mt-4 text-lg">
          Username:
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>

        <input
          className="rounded-lg p-1 text-2xl text-black"
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />

        <p
          id="uidnote"
          className={
            userFocus && user && !validName ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters. <br /> Must begin with a letter. <br /> Letters,
          numbers, underscores, and hyphens are allowed.
        </p>
        {/* END - USERNAME LABEL AND FIELD*/}

        {/* PASSWORD LABEL AND FIELD*/}
        <label htmlFor="password" className="mt-4 text-lg">
          Password:
          <span className={validPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPwd || !pwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>

        <input
          className="rounded-lg p-1 text-2xl text-black"
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />

        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters. <br />
          Must include uppercase and lowercase letters, a number and a special
          character. <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>
          <span aria-label="at symbol">@</span>
          <span aria-label="hashtag">#</span>
          <span aria-label="dollar sign">$</span>
          <span aria-label="percent symbol">%</span>
        </p>
        {/* END - PASSWORD LABEL AND FIELD*/}

        {/* CONFIRM PASSWORD LABEL AND FIELD*/}
        <label htmlFor="confirm" className="mt-4 text-lg">
          Confirm Password:
          <span className={validMatch && matchPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>

        <input
          className="rounded-lg p-1 text-2xl text-black"
          type="password"
          id="confirm"
          onChange={(e) => setMatchPwd(e.target.value)}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlue={() => setMatchFocus(false)}
        />

        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field
        </p>
        {/* END - CONFIRM PASSWORD LABEL AND FIELD*/}

        <button
          className={`p-2 mt-4 rounded-lg text-2xl cursor-pointer bg-blue-700
           disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-700`}
          disabled={!validName || !validPwd || !validMatch ? true : false}
        >
          Sign Up
        </button>
      </form>

      <p className="text-lg">
        Already registered? <br />{" "}
        <span className="inline-block">
          {/* Add react router link here*/}
          <a href="#" className="text-white visited:text-white underline">
            Sign In
          </a>
        </span>
      </p>
      <p></p>
    </section>
  );
};

export default RegistrationForm;
