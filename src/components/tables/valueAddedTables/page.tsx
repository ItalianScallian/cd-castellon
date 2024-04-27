import { columns } from './columns';
import { DataTable } from './data-table';

export default function ValueAddedTable({ data }: any) {
  return (
    <div className='mx-auto py-4'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
