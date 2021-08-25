const ItemDetail = ({name}) => {
  return (
    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
        <div className="flex items-center">
            <div>
                <div className="text-sm leading-5 text-gray-800">{name}</div>
            </div>
        </div>
    </td>
  )
}
