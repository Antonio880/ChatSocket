import Header from '../components/Header';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useUserContext } from '../components/ContextUser';
import { useSocketContext } from '../components/ContextSocket';
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { setUser } = useUserContext();
  const { setSocket } = useSocketContext();
  const BASE_URL = "https://chat-socket-eb53a2dd15bb.herokuapp.com/"
  const navigate = useNavigate();
  const onSubmit = async () => {
    const email = watch("email");
    const password = watch("password");
    const data = {
      id: `${new Date().getTime()}`,
      email: email,
      password: password,
    }
    //setUser(data);
    try{
      const response = await axios.post(`${BASE_URL}users`, data);
      if(response.status === 201 || response.status === 200){
        setUser(response.data.user);
        const socket = await io.connect(BASE_URL);
        socket.emit('set_username', response.data.user.email);
        setSocket(socket);
        navigate('/home');
      }else{
        alert("Error: " + response.status);
      }
    }catch(e){
      alert(`Error - ${e.message}`);
    }
  }

  return (
      <>
        <Header />
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    {...register("email", { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 pl-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.email && <span>This field is required</span>}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    {...register("password", { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 pl-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && <span>This field is required</span>}
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-black font-semibold leading-6 transition ease-in-out delay-150 bg-blue-500 hover:text-white hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }