import { dmApi } from "../../app/dmApi";
import { getAuthorizationHeader, handleQueryError, handleQueryErrorAndSuccess } from "../../helpers/RtkQueryUtils";

const customerApi = dmApi.injectEndpoints({
    endpoints: (build) => ({
        addCustomer: build.mutation({
            query: ({ data }) => ({
                url: "admin/create-customer",
                method: "POST",
                body: data,
                headers: getAuthorizationHeader()
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                await handleQueryErrorAndSuccess(
                    queryFulfilled,
                    "Added",
                    "Customer"
                );
            },
        }),
        updateCustomer: build.mutation({
            query: ({ data }) => ({
                url: "admin/update-customer-details",
                method: "PUT",
                body: data,
                headers: getAuthorizationHeader()
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                await handleQueryErrorAndSuccess(
                    queryFulfilled,
                    "Updated",
                    "Customer"
                );
            },
        }),
  
        getCustomerDetail: build.query({
            query: ({ id } = {}) => ({
                url: `admin/get-customer-details?customerId=${id}`,
                method: "GET",
                headers: getAuthorizationHeader(),
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                await handleQueryError(queryFulfilled);
            },
        }),
         getCustomerProfile: build.query({
            query: () => ({
                url: "customer/get-customer-profile-details",
                method: "GET",
                headers: getAuthorizationHeader(),
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                await handleQueryError(queryFulfilled);
            },
        }),
        createJob: build.mutation({
            query: ({ data }) => ({
                url: "customer/create-job",
                method: "POST",
                body: data,
                headers: getAuthorizationHeader(),
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                await handleQueryErrorAndSuccess(
                    queryFulfilled,
                    "Created",
                    "Job"
                );
            },
          
        }),
        saveDeliveryAddress: build.mutation({
            query: ({ data }) => ({
                url: "customer/save-delivery-address",
                method: "POST",
                body: data,
                headers: getAuthorizationHeader(),
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                await handleQueryErrorAndSuccess(
                    queryFulfilled,
                    "Saved",
                    "Delivery Address"
                );
            },
              invalidatesTags: ["getDeliveryAddressesAPI"]
        }),
        deleteDeliveryAddress: build.mutation({
            query: ({ addressId }) => ({
                url: `customer/delete-delivery-address?addressId=${addressId}`,
                method: "DELETE",
                headers: getAuthorizationHeader(),
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                await handleQueryErrorAndSuccess(
                    queryFulfilled,
                    "Deleted",
                    "Delivery Address"
                );
            },
            invalidatesTags: ["getDeliveryAddressesAPI"]
        }),
        getDeliveryAddresses: build.query({
            query: ({ page = 1, limit = 10, addressType } = {}) => ({
                url: `customer/get-delivery-address?page=${page}&limit=${limit}&addressType=${addressType}`,
                method: "GET",
                headers: getAuthorizationHeader(),
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                await handleQueryError(queryFulfilled);
            },
               providesTags:["getDeliveryAddressesAPI"],
        }),
        getAllJobsByStatus: build.query({
            query: ({ page = 1, limit = 10, search = '', tabName = '' } = {}) => ({
                url: `customer/get-all-jobs-by-status?page=${page}&limit=${limit}&search=${search}&tabName=${tabName}`,
                method: "GET",
                headers: getAuthorizationHeader(),
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                await handleQueryError(queryFulfilled);
            },
        }),
        getJobDetails: build.query({
            query: ({ id }) => ({
                url: `customer/get-job-details?jobId=${id}`,
                method: "GET",
                headers: getAuthorizationHeader(),
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                await handleQueryError(queryFulfilled);
            },
        }),
        
    })
})
export const {
    useAddCustomerMutation,
    useUpdateCustomerMutation,
    useGetCustomerDetailQuery,
    useGetCustomerProfileQuery,
    useCreateJobMutation,
    useSaveDeliveryAddressMutation,
    useGetDeliveryAddressesQuery,
    useGetAllJobsByStatusQuery,
    useGetJobDetailsQuery,
    useDeleteDeliveryAddressMutation
} = customerApi;