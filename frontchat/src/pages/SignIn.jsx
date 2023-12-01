import Header from "../components/Header";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUserContext } from "../components/ContextUser";
import { useSocketContext } from "../components/ContextSocket";
import io from "socket.io-client";
import Input from "../components/input";
import { useNavigate } from "react-router-dom";
import ButtonSign from "../components/ButtonSign";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { user, setUser } = useUserContext();
  const { setSocket } = useSocketContext();
  const BASE_URL = "http://localhost:3001/";
  // "https://chat-socket-eb53a2dd15bb.herokuapp.com/" ||
  const navigate = useNavigate();
  const onSubmit = async () => {
    const email = watch("email");
    const password = watch("password");
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${BASE_URL}user`, data);
      if (response.status === 200) {
        const userUpdated = await axios.put(
          `${BASE_URL}users/${response.data.user._id}`,
          {
            isOn: "true",
          }
        );
        setUser(userUpdated.data.user);
        const socket = await io.connect(BASE_URL);
        console.log(userUpdated);
        socket.emit("set_username", response.data.user.email);
        setSocket(socket);
        navigate("/home");
      } else {
        alert("Email e/ou senha incorretos");
      }
    } catch (e) {
      alert(`Error - ${e.message}`);
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <Input type={"email"} register={register} />
              </div>
              {errors.email && <span>This field is required</span>}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <Input type={"password"} register={register} />
                {errors.password && <span>This field is required</span>}
              </div>
            </div>
            <div>
              <ButtonSign text={"Sign In"} />
            </div>
          </form>

          <p className="flex justify-center pt-4">
            Ainda não cadastrado?{" "}
            <strong>
              <a
                className="pl-2 cursor-pointer"
                onClick={() => navigate("/SignUp")}
              >
                Clique aqui
              </a>
            </strong>
          </p>
          <div className="flex justify-center pt-3">
            <button
              className="disabled transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 bg-indigo-600 hover:bg-indigo-500 font-semibold leading-6 text-black hover:text-white w-60 rounded-md h-8 text-sm"
              onClick={() => {
                const githubAuthURL =
                  "https://github.com/login/oauth/authorize?client_id=a6c6220348f21b49b428&scope=read:user user:email repo";

                // Abrir a URL em uma nova guia (_blank)
                window.open(githubAuthURL, "_blank");
              }}
            >
              Log in with GitHub
            </button>
          </div>
        </div>
      </div>
    </>
  );
}