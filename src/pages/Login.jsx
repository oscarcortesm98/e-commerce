import axios from 'axios'
import { useForm } from 'react-hook-form'
import { loginUser, logout } from '../store/slices/userInfo.slice'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

  const { token, user } = useSelector((store) => store.userInfo)

  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()

  const submit = (dataForm) => {

    dispatch(loginUser(dataForm))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <section className='bg-slate-100 grid place-content-center px-2'>

      {
        token ? (
 
          <section className="w-[300px] max-w-[380px] grid gap-6 bg-white rounded-2xl shadow-sm shadow-gray-500 text-center p-6 pt-8 translate-y-[60%]">
            <i className='bx bxs-user-circle text-6xl'></i>
            <span className='capitalize mb-3'>{user.firstName} <hr /> {user.lastName}</span>
            <button onClick={handleLogout} className='w-full rounded-lg font-semibold bg-red-500 text-white p-2 hover:bg-red-600 transition-colors duration-300'>L O G O U T</button>
          </section>

        ) : (

          <form onSubmit={handleSubmit(submit)} className="max-w-[380px] bg-white rounded-2xl shadow-sm shadow-gray-500 p-5">
            <h3 className='font-bold pt-2'>Welcome!</h3>
            <p className='font-semibold py-4'>Enter your email and password to continue.</p>

            <section className='bg-blue-100 rounded-lg p-4'>

              <h5 className='text-center font-bold mb-4'>Test data</h5>

              <div className='flex items-center gap-2'>
                <i className='bx bx-envelope text-xl'></i>
                <span className='text-sm'>john@gmail.com</span>
              </div>

              <div className='flex items-center gap-2'>
                <i className='bx bx-lock-alt text-xl'></i>
                <span className='text-sm'>john1234</span>
              </div>

            </section>

            <section className='pt-4 pb-6'>
              <div className='grid gap-3 pt-2'>
                <label className='font-semibold text-sm flex items-center'><i className='bx bx-envelope text-xl mr-1'></i>Email</label>
                <input {...register("email")} className='bg-slate-200 rounded-lg outline-none font-semibold text-sm p-2 px-3' id="email" type="email" />
              </div>

              <div className='grid gap-2 pt-4'>
                <label className='font-semibold text-sm flex items-center'><i className='bx bx-lock-alt text-xl mr-1'></i>Password</label>
                <input {...register("password")} className='bg-slate-200 rounded-lg outline-none font-semibold text-sm p-2 px-3' id="password" type="password" />
              </div>
            </section>

            <div className='pt-4 pb-6'>
              <button className='w-full bg-red-500 rounded-lg font-semibold text-white py-2 hover:bg-red-500/95'>L O G I N</button>
            </div>

            <span className='text-xs'>Don't you have an acount? <strong>Sign up</strong>.</span>

          </form>

        )
      }
    </section>
  )
}

export default Login