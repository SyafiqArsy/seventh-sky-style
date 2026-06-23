"use client";

import {
  useAdminUsers,
} from "./use-admin-users";

export default function AdminUsersPage() {
  const query =
    useAdminUsers();

  if (query.isLoading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  const users =
    query.data ?? [];

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold">
        Users
      </h1>

      <div className="mt-8 overflow-x-auto">

        <table className="w-full border">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Email
              </th>

              <th className="p-3 text-left">
                Role
              </th>

              <th className="p-3 text-left">
                Provider
              </th>

              <th className="p-3 text-left">
                Created
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map(
              (user: any) => (
                <tr
                  key={user.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {user.name}
                  </td>

                  <td className="p-3">
                    {user.email}
                  </td>

                  <td className="p-3">
                    {user.role}
                  </td>

                  <td className="p-3">
                    {user.provider}
                  </td>

                  <td className="p-3">
                    {new Date(
                      user.createdAt,
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ),
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}