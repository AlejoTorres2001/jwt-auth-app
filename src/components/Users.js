import useUsers from "../hooks/useUsers";
const Users = () => {
  const [users] = useUsers();
  return (
    <article>
      <h2>Users Lists</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      <br />
    </article>
  );
};

export default Users;
