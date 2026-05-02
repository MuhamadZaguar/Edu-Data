export const mapUsersToSiswa = (users = []) =>
  users.map((user, index) => ({
    id: user.id,
    nama: user.name,
    nis: `NIS${String(user.id).padStart(3, "0")}`,
    kelas: ["X", "XI", "XII"][index % 3],
    nilai: 70 + ((index * 7 + user.id) % 31),
  }));

export const fetchSiswaFromApi = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error(`Status ${response.status}`);
  }
  const users = await response.json();
  return mapUsersToSiswa(users);
};

