import React, { useEffect, useState } from 'react';
import banner from '../../components/assets/signInPic1.jpg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../../components/actions/auth';

interface ActivateProps {
  verify: (uid: string, token: string) => void;
}

const Activate: React.FC<ActivateProps> = ({ verify }): React.ReactElement => {
  const [verified, setVerified] = useState(false);
  const backgroundImageStyle = {
    backgroundImage: `url(${banner})`,
  };

  const navigate = useNavigate();
  const { uid, token } = useParams();

  const verifyAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uid && token) {
      verify(uid, token);
      setVerified(true);
    }
  };
  useEffect(()=> {
    if (verified){
      navigate('/login')
    } else {
      console.error('Error in verifying account')
    }
  }, [verified])


  return (
    <div className="flex items-center justify-center h-screen bg-gray-200"> 
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-16">
        <h1 className="text-2xl font-bold text-gray-800 mb-10">Verify Your Account</h1>

        <p className="text-gray-600 mb-12">
          Thanks for signing up! Please verify your account to complete the registration process.
        </p>

        <form onSubmit={verifyAccount}>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white font-bold py-3 px-6 rounded-lg"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};


export default connect(null,  { verify })(Activate);
