import React from "react";

const UserDetails = () => {
  const user = {
    fullName: "John Doe",
    ABH_ID: "ABH1234",
    email: "johndoe@example.com",
    phoneNumber: "1234567890",
    profilePicture: "https://via.placeholder.com/150",
    gender: "Male",
    dob: "2000-01-01T00:00:00.000+00:00",
    institution: "XYZ University",
    course: "B.Tech",
    paymentStatus: false,
    isAdmin: false,
    isCampusAmbassador: true,
    eventsParticipated: [
      { name: "Raga", date: "2024-03-15" },
      { name: "Grafiti", date: "2024-04-10" },
      { name: "Harmosa", date: "2024-05-05" },
      { name: "Raga", date: "2024-03-15" },
      { name: "Grafiti", date: "2024-04-10" },
      { name: "Harmosa", date: "2024-05-05" }
    ]
  };

return (
    <div className="flex items-center justify-center rounded bg-gray-900 text-white p-4">
        <div className="w-full max-w-4xl bg-gray-800 shadow-lg rounded-lg p-6">
            <div className="flex flex-col items-center mt-6 space-y-3 text-gray-300">
                
                <h2 className="text-3xl font-bold mt-4 text-teal-300">{user.fullName}</h2>
                <p className="text-teal-400">{user.course} at {user.institution}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
                    <p><span className="font-semibold">ABH ID:</span> {user.ABH_ID}</p>
                    <p><span className="font-semibold">Email:</span> {user.email}</p>
                    <p><span className="font-semibold">Phone:</span> {user.phoneNumber}</p>
                    <p><span className="font-semibold">Gender:</span> {user.gender}</p>
                    <p><span className="font-semibold">DOB:</span> {new Date(user.dob).toDateString()}</p>
                    
                    <p><span className="font-semibold">Is Admin:</span> {user.isAdmin ? "Yes" : "No"}</p>
                    <p><span className="font-semibold">Campus Ambassador:</span> {user.isCampusAmbassador ? "Yes" : "No"}</p>
                    <p><span className="font-semibold">Payment Status:</span> {user.paymentStatus ? "Paid" : "Not Paid"}</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-2xl font-semibold text-teal-300">Events Participated</h3>
                {user.eventsParticipated.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                        {user.eventsParticipated.map((event, index) => (
                            <li key={index} className="bg-gray-700 p-2 rounded-lg  shadow-md">
                                <span className="font-semibold">{event.name}</span> - {new Date(event.date).toDateString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-teal-400">No events participated.</p>
                )}
            </div>
        </div>
    </div>
);
};

export default UserDetails;