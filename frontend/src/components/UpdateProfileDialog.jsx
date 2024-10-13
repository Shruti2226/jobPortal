import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.map((skill) => skill) || '',
    file: user?.profile?.resume || '',
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullName', input.fullName);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('bio', input.bio);
    formData.append('skills', input.skills);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
    console.log(input);
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="name">Name</Label>
                <Input
                  className="col-span-3"
                  type="text"
                  onChange={changeEventHandler}
                  name="name"
                  id="name"
                  value={input.fullName}
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="col-span-3"
                  type="email"
                  onChange={changeEventHandler}
                  name="email"
                  id="email"
                  value={input.email}
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="number">Phone No.</Label>
                <Input
                  className="col-span-3"
                  type="number"
                  onChange={changeEventHandler}
                  name="number"
                  id="name"
                  value={input.phoneNumber}
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  className="col-span-3"
                  type="text"
                  onChange={changeEventHandler}
                  name="bio"
                  id="bio"
                  value={input.bio}
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="skills">Skills</Label>
                <Input
                  className="col-span-3"
                  type="text"
                  onChange={changeEventHandler}
                  name="skills"
                  id="skills"
                  value={input.skills}
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="file">Resume</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={changeFileHandler}
                  className="col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
              {loading ? (
                <Button className="w-full my-1">
                  {' '}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...{' '}
                </Button>
              ) : (
                <div className="button">
                  <Button type="submit" className="w-full my-4 btn-4">
                    Update
                  </Button>
                </div>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
