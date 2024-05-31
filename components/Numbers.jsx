
const Numbers = ({number, label}) => {
  return (
    <div className="flex flex-col items-center">
            <div className="text-2xl font-bold">{number}</div>
            <div className="text-sm text-gray-500">{label}</div>
     </div>
  )
}

export default Numbers