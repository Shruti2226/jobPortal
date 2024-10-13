import React from 'react';
import '../components/component css/Component.css';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };
  return (
    <div className="card-bg p-4 m-3">
      <div className="flex items-center justify-between">
        <p>
          {daysAgoFunction(job?.createdAt) == 0
            ? 'Today'
            : `${daysAgoFunction(job?.createdAt)}days ago`}{' '}
          ago
        </p>
        <Button
          className="rounded-full text-gray-400 bg-transparent"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6 bg-transparent" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>

        <div>
          <h1 className="card-h1">{job?.company?.name}</h1>
          <p className="card-p">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-500">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4 card-badge">
        <Badge className="text-blue-900 font-bold badge-bg" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-blue-700 font-bold badge-bg" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-blue-400 font-bold badge-bg" variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4 button1">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="bg-slate-500 btn1"
        >
          Details
        </Button>
        <Button className="bg-slate-400 btn1">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
