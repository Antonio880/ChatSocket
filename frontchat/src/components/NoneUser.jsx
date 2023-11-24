import { useNavigate } from "react-router-dom";

export default function NoneUser(){
    
    const navigate = useNavigate();

    return(
        <div className="">
            <div className="">
                <h1 className="mt-60  flex justify-center items-center">Você não está logado, Se tiver conta <strong><a className="cursor-pointer pl-1" onClick={() => navigate("/")}>Clique aqui </a></strong></h1>
                <h2 className=" flex justify-center items-center"><strong><a className="cursor-pointer pr-1" onClick={() => navigate('/SignUp')}>Aqui</a></strong> caso deseje se cadastrar</h2>
            </div>
        </div>
    );
}