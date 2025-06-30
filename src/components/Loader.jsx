import { Html, useProgress } from '@react-three/drei'

export const Loader = () => {
  const { progress } = useProgress()
  
  return (
    <Html center>
      <div className='flex justify-center items-center'>
        <div className='w-20 h-20 border-4 border-opacity-20 border-blue-500 border-t-blue-500 rounded-full animate-spin'></div>
        <p className='text-blue-500 text-xl font-bold mt-2'>{progress.toFixed(2)}%</p>
      </div>
    </Html>
  )
}
