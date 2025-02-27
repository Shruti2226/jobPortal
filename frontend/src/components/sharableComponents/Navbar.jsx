import React from 'react';
import '../component css/Component.css';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="nav-bg">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-18">
        <div>
          <h1 className="nav-heading">FirstStep</h1>
        </div>

        <div className="flex items-center gap-5 nav-links">
          <ul className="flex items-center gap-5">
            {user && user.role == 'recruiter' ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>{' '}
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>{' '}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>{' '}
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>{' '}
                </li>
                <li>
                  <Link to="/browse">Browse</Link>{' '}
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button className="button-29">LOGIN</Button>
              </Link>

              <Link to="/signup">
                <Button className="button-29">SIGNUP</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="profilePhoto"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 bg-blue-100">
                <div>
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="profilePhoto"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col mx-2 my-2  text-gray-500 ">
                    {user && user.role == 'student' && (
                      <div className="flex w-fit items-center gap-1 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          {' '}
                          <Link to="/profile">View Profile</Link>{' '}
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-1 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
