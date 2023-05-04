import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import DataTableManager from '@commercetools-uikit/data-table-manager';
import DataTable from '@commercetools-uikit/data-table';
import {
  useDataTableSortingState,
  usePaginationState,
  useSorting,
} from '@commercetools-uikit/hooks';
import { useBusinessUnitsFetcher } from '../../hooks/use-business-units-connector';

const BusinessUnits = () => {
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });

  const { businessUnitsPaginatedResults, error, loading } = useBusinessUnitsFetcher({
    page,
    perPage,
    tableSorting,
  });

  console.log(businessUnitsPaginatedResults,error,loading);

  
  const items = [
    { id: '1', name: '88 Secret Bars', type: 'Storage', key: 'S22FSCAR019' },
    { id: '2', name: 'Abinger Stool', type: 'Seating', key: 'S22FCHRN004' },
    {
      id: '3',
      name: 'Book Ends Table Lamp',
      type: 'Tablelamps',
      key: 'S22LQUE004',
    },
  ];
  const columns = [
    { key: 'name', label: 'Product name', isSortable: true },
    { key: 'type', label: 'Product type', isSortable: true },
    { key: 'key', label: 'Product key', isSortable: true },
  ];

  const {
    items: rows,
    sortedBy,
    sortDirection,
    onSortChange,
  } = useSorting(items);

  return (
    <>
      <Spacings.Stack scale="s">
        <Text.Headline as="h3">{'Business Units'}</Text.Headline>
        <DataTableManager columns={columns}>
          <DataTable
            rows={rows}
            sortedBy={sortedBy}
            onSortChange={onSortChange}
            sortDirection={sortDirection}
          />
        </DataTableManager>
      </Spacings.Stack>
    </>
  );
};

export default BusinessUnits;
