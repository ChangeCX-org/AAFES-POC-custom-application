import { FetchBusinessUnitsQuery } from './fetch-business-units.ctp.graphql';
import { TDataTableSortingState } from '@commercetools-uikit/hooks';
import { ApolloError } from '@apollo/client';
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';

type PaginationAndSortingProps = {
  page: { value: number };
  perPage: { value: number };
  tableSorting: TDataTableSortingState;
};

type TUseBusinessUnitsFetcher = (
  paginationAndSortingProps: PaginationAndSortingProps
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  businessUnitsPaginatedResults: any;
  error?: ApolloError;
  loading: boolean;
};

export const useBusinessUnitsFetcher: TUseBusinessUnitsFetcher = ({
  page,
  perPage,
  tableSorting,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error, loading } = useMcQuery<any>(FetchBusinessUnitsQuery, {
    variables: {
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    businessUnitsPaginatedResults: data?.businessUnits,
    error,
    loading,
  };
};
