import Link from "next/link"

const LinkButton = ({href, label}) => {
  return (
    <Link
    className="bg-gray-200 dark:bg-gray-700 rounded-md p-2 text-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    href={href}
  >
    {label}
  </Link>
  )
}

export default LinkButton