import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import{ axiosInstance} from "../../lib/axios.js"
import { Link } from 'react-router-dom';
import { Home, Users, Bell, User, LogOut } from 'lucide-react';

const Navbar=()=>{

    const { data: authUser }= useQuery({queryKey:["authUser"]});

	const queryClient= useQueryClient()

    const { data: notifications }= useQuery({
        queryKey:["notifications"],
        queryFn: async () => axiosInstance.get("/notifications"),
        enabled:!!authUser, 
        onError: (error) => console.log("Notification Fetch Error:", error),
    });

    const { data:connectionRequests } = useQuery({
        queryKey:["connectionRequests"],
        queryFn: async () => axiosInstance.get("/connections/requests"),
        enabled:!!authUser,
        onError: (error) => console.log("Connection request  Fetch Error:", error)

    });
    const { mutate: logout }= useMutation({
        mutationFn: ()=> axiosInstance.post("/auth/logout"),
		onSuccess: ()=>{
			queryClient.invalidateQueries({ queryKey:["authUser"]});

		}
    });

    // console.log("notification", notifications);
    // console.log("connectionRequest",connectionRequests);

    const unreadNotificationCount= notifications?.data.filter((notif) => !notif.read).length;
    const unreadConnectionReguestsCount=connectionRequests?.data?.length;

	return (
		<nav className='bg-gray-100 shadow-md sticky top-0 z-10'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='flex justify-between items-center py-3'>
					<div className='flex items-center space-x-4'>
						<Link to='/'>
							<img className='h-8 rounded' src='/small-logo.png' alt='LinkedIn' />
							<span className='text-gray-500 font-semibold text-sm italic border-l-2 pl-2 border-gray-300'>
                              by Srinivas
                             </span>
						</Link>
					</div>
					<div className='flex items-center gap-4 md:gap-6 flex-wrap'>
						{authUser ? (
							<>
								<Link to={"/"} className='text-neutral flex flex-col items-center'>
									<Home size={20} />
									<span className='text-xs hidden md:block'>Home</span>
								</Link>
								<Link to='/network' className='text-neutral flex flex-col items-center relative'>
									<Users size={20} />
									<span className='text-xs hidden md:block'>My Network</span>
									{unreadConnectionReguestsCount > 0 && (
										<span
											className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
										rounded-full size-3 md:size-4 flex items-center justify-center'
										>
											{unreadConnectionReguestsCount}
										</span>
									)}
								</Link>
								<Link to='/notifications' className='text-neutral flex flex-col items-center relative'>
									<Bell size={20} />
									<span className='text-xs hidden md:block'>Notifications</span>
									{unreadNotificationCount > 0 && (
										<span
											className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
										rounded-full size-3 md:size-4 flex items-center justify-center'
										>
											{unreadNotificationCount}
										</span>
									)}
								</Link>
								<Link
									to={`/profile/${authUser.username}`}
									className='text-neutral flex flex-col items-center'
								>
									<User size={20} />
									<span className='text-xs hidden md:block'>Me</span>
								</Link>
								<button
									className='flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800'
									onClick={() => logout()}
								>
									<LogOut size={20} />
									<span className='hidden md:inline'>Logout</span>
								</button>
							</>
						) : (
							<>
								<Link to='/login' className='btn btn-ghost'>
									Sign In
								</Link>
								<Link to='/signup' className='btn btn-primary'>
									Join now
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};  

export default Navbar;