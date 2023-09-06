import React from 'react';

interface SkeletonProps {
    children?: React.ReactNode;
}

const Skeleton = ({ children }: SkeletonProps) => {
    return (
        <div role="status" className='animate-pulse'>
            {children}
        </div>
    );
};

export default Skeleton;
