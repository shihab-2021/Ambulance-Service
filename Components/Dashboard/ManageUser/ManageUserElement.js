import Link from "next/link";

const ManageUserElement = ({ data, remainingUsers, i }) => {
  const deleteItem = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        remainingUsers(data._id);
        fetch(`https://universal-hostel-api.onrender.com/users/${data._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() =>
            swal("User delete successful!", {
              icon: "success",
            })
          )
          .then((data) => console.log(data));
      }
    });
  };
  return (
    <tr className={`${i % 2 && "bg-[#36393e82]"}`}>
      <td>{data.displayName}</td>
      <td>{data.email}</td>
      <td>{data.phone}</td>
      <td className="float-right">
        <Link href={`/dashboard/manage-user/${data._id}`}>
          <button className="mx-2 bg-green-400 py-1 px-3 text-gray-800 font-bold rounded hover:bg-green-600">
            View
          </button>
        </Link>

        <button
          className="mx-2 bg-red-400 py-1 px-3 text-gray-800 font-bold rounded hover:bg-red-600"
          onClick={deleteItem}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ManageUserElement;
