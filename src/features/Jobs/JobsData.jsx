import React from 'react'
import Datatable from '../../components/shared/datatable/Datatable';
import { EditTableSvg } from '../../svgFiles/EditTableSvg';
import { useGetAllJobsByStatusQuery } from '../../app/customerApi/customerApi';
import { formatDateToMDY } from '../../helpers/Utils';
import { getClassByType } from '../../helpers/Utils';
import { useNavigate } from 'react-router';
const JobsData = ({tabName}) => {
    const navigate = useNavigate();
    const [page, setPage] = React.useState(1);
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    const { data: jobsList, isLoading, error } = useGetAllJobsByStatusQuery({ tabName: tabName, page: page });
    console.log(jobsList, "data from jobs api");



    const columns = [
   {
            label: "Job Id",
            accessor: "id",
            cell: ({ row }) => (
                <span
                  
                >
                    {`job-${row?.id}`}
                </span>
            ),
        },
        { label: "Vehicle", accessor: "vehicle_make" },
        { label: "Vin Number", accessor: "vin_number" },
        { label: "Route", accessor: "vin_number" },
        { label: "Job Link", accessor: "vin_number" },
        {
            label: "Status",
            accessor: "actions",
            cell: ({ row }) => (
                <span
                    className={`fn-badge ${getClassByType(row?.request_status)}`}
                >
                    {row?.request_status}
                </span>
            ),
        },
        {
            label: "Pickup Date",
            accessor: "pickupDate",
            cell: ({ row }) => (
                <span>
                  {formatDateToMDY(row?.pickup_date)}
                </span>
            ),
        },
        {
            label: "Delivery Date",
            accessor: "pickupDate",
            cell: ({ row }) => (
                <span>
                    {formatDateToMDY(row?.dropoff_date)}
                </span>
            ),
        },
        { label: "Driver", accessor: "vin_number" },
        {
            label: "Actions",
            accessor: "actions",
            cell: ({ row }) => (
                <span
                    className="cursor-pointer text-primary"
                    onClick={() => navigate(`/jobs/job-details/${row.id}`)}
                >
                   View
                </span>
            ),
        },
    ];
    return (

        <Datatable
            tableData={jobsList?.data}
            columns={columns}
            onPageChange={handlePageChange}
            page={page}
            showPegination={true}
            isLoading={false}
            showFilter={true}
            title="Job List"
        />

    )
}

export default JobsData