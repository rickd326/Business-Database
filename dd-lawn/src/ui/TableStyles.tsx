interface TableHeaderProps {
  text: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ text }) => {
  return (
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {text}
    </th>
  );
};
interface TableCellProps {
    children: React.ReactNode;
  }
  
  const TableCell: React.FC<TableCellProps> = ({ children }) => {
    return (
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {children}
      </td>
    );
  };
  
  
export {TableHeader, TableCell};
