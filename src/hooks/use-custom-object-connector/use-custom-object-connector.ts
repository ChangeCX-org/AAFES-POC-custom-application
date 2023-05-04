import { useMcMutation, useMcQuery } from "@commercetools-frontend/application-shell";
import { GRAPHQL_TARGETS } from "@commercetools-frontend/constants";
import FetchCustomObjects from './fetch-custom-objects.ctp.graphql';
import CreateCustomObjects from './update-custom-objects.ctp.graphql';
import DeleteCustomObjects from './delete-custom-object.ctp.graphql';

export const useCustomObjectsFetcher = () => {
    const { refetch, data, error, loading } = useMcQuery(FetchCustomObjects, {
        variables: {
            container: "message"
        },
        context: {
            target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM
        }
    });
    return { refetch, data, error, loading }
}

export const useCreateObjectsFetcher = () => {
    const [createObject, { loading }] = useMcMutation(CreateCustomObjects, {
        context: {
            target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM
        }
    });

    const onExecute = async (draft: any) => {
        await createObject({
            variables: {
                draft
            }
        })
    }

    return { onExecute, loading }
}

export const useDeleteObjectsFetcher = () => {
    const [delteObject, { loading }] = useMcMutation(DeleteCustomObjects, {
        context: {
            target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM
        }
    });

    const onExecute = async (id: string) => {
        await delteObject({
            variables: {
                id
            }
        })
    }

    return { onExecute, loading }
}