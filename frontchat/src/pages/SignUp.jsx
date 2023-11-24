import Header from "../components/Header";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUserContext } from "../components/ContextUser";
import { useSocketContext } from "../components/ContextSocket";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import ButtonSign from "../components/ButtonSign";
import Input from "../components/input";
import { Box } from "@mui/material";
import Modal from '@mui/material/Modal';

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setUser } = useUserContext();
  const { setSocket } = useSocketContext();
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const BASE_URL = "http://localhost:3001/";
  // "https://chat-socket-eb53a2dd15bb.herokuapp.com/" ||
  const navigate = useNavigate();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const onSubmit = async () => {
    const email = watch("email");
    const password = watch("password");
    const data = {
      id: `${new Date().getTime()}`,
      email: email,
      password: password,
    };
    //setUser(data);
    try {
      const response = await axios.post(`${BASE_URL}users`, data);
      if (response.status === 201) {
        setUser(response.data.user);
        const socket = await io.connect(BASE_URL);
        socket.emit("set_username", response.data.user.email);
        setSocket(socket);
        navigate("/home");
      } else if(response.status === 409) {
        handleOpen();
      }else{
        alert("Error: " + response.status);
      }
    } catch (e) {
      alert(`Error - ${e.message}`);
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
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
                {errors.password && (
                  <span className="text-orange-600">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 pl-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type={"password"}
                placeholder="Confirm Password"
                name="passwordConfirm"
                {...register("passwordConfirm", {
                  required: "Confirm Password is required",
                  validate: {
                    matchesPassword: (value) => {
                      const password = watch('password');
                      if (password && value !== password) {
                        return "Your passwords do not match";
                      }
                      return true;
                    },
                  },
                })}
              />
              <p className="alerts">{errors.passwordConfirm?.message}</p>
              </div>
            </div>
            <div>
              <ButtonSign text={"Sign Up"} />
            </div>
            <p className='flex justify-center pt-4'>Já está cadastrado? <strong><a className='pl-2 cursor-pointer' onClick={() => navigate("/")}>Clique aqui</a></strong></p>
          </form>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Usuário ja existente</h2>
          <p id="parent-modal-description">
            Deseja ir para a tela de Login
          </p>
          <button onClick={() => {
            navigate("/")
            handleClose();
            }}>Login</button>
        </Box>
      </Modal>
    </>
  );
}
