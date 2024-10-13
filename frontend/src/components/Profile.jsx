import React, { useState } from 'react';
import Navbar from './sharableComponents/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobs from './AppliedJobs';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="profile-bg">
      <Navbar />

      <div className="max-w-4xl mx-auto my-5 p-8 p1-style">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 bg-transparent">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>

            <div>
              {' '}
              <h1 className="text-medium  font-bold text-gray-600 text-xl">
                {user?.fullName}
              </h1>
              <p className="text-gray-500">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right bg-slate-500 hover:bg-slate-600"
          >
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail className="text-gray-600" />
            <span className="text-gray-600">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="text-gray-600" />
            <span className="text-gray-600">{user?.phoneNumber}</span>
          </div>
        </div>

        <div>
          <h1 className="text-md font-bold text-gray-600">Skills</h1>

          <div className="flex items-center my-2 gap-3">
            {user?.profile?.skills?.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.2 mt-4 text-gray-600">
          <Label className="text-md font-bold ">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p1-style">
        <h1 className="font-bold text-xl text-gray-600 py-2 px-3">
          Applied Jobs
        </h1>

        {/* Applied Job Table */}
        <AppliedJobs />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
