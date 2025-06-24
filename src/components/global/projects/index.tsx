'use client';

import { containerVariants } from '@/lib/constants';
import { Project } from '@prisma/client';
import { motion } from 'framer-motion';
import React from 'react';
import ProjectCard from '../project-card';

type Props = {
  projects: Project[];
};

const Projects = ({ projects }: Props) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 p-2 sm:p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project, id) => (
        <motion.div
          key={id}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <ProjectCard
            projectId={project.id}
            title={project.title || 'Untitled'}
            createdAt={project.createdAt.toString()}
            isDelete={project.isDeleted || false}
            slideData={project.slides || []}
            themeName={project.themeName || 'default'}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Projects;
