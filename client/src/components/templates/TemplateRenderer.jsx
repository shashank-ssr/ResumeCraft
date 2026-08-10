import React from 'react';
import { ClassicTemplate } from './ClassicTemplate';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { ExecutiveTemplate } from './ExecutiveTemplate';
import { StudentTemplate } from './StudentTemplate';
import { TechTemplate } from './TechTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { CompactTemplate } from './CompactTemplate';
import { TimelineTemplate } from './TimelineTemplate';
import { TwoColumnTemplate } from './TwoColumnTemplate';
import { PhotoModernTemplate } from './PhotoModernTemplate';
import { PhotoProfessionalTemplate } from './PhotoProfessionalTemplate';
import { PhotoCreativeTemplate } from './PhotoCreativeTemplate';
import { ATSCleanTemplate } from './ATSCleanTemplate';
import { ElegantTemplate } from './ElegantTemplate';

export const TemplateRenderer = ({ templateId = 'classic', data, design, hiddenSections = {} }) => {
  switch (templateId) {
    case 'modern':
      return <ModernTemplate data={data} design={design} hiddenSections={hiddenSections} />;
    case 'minimal':
      return <MinimalTemplate data={data} design={design} hiddenSections={hiddenSections} />;
    case 'executive':
      return <ExecutiveTemplate data={data} design={design} hiddenSections={hiddenSections} />;
    case 'student':
      return <StudentTemplate data={data} design={design} hiddenSections={hiddenSections} />;
    case 'tech':
      return <TechTemplate data={data} design={design} hiddenSections={hiddenSections} />;
    case 'creative':
      return <CreativeTemplate data={data} design={design} hiddenSections={hiddenSections} />;
    case 'compact':
      return <CompactTemplate data={data} design={design} hiddenSections={hiddenSections} />;
    case 'timeline':
      return <TimelineTemplate data={data} design={design} hiddenSections={hiddenSections} />;
    case 'two-column':
      return <TwoColumnTemplate data={data} design={design} hiddenSections={hiddenSections} />;
    case 'photo-modern':
      return <PhotoModernTemplate data={data} design={design} hiddenSections={hiddenSections} />;
    case 'photo-professional':
      return <PhotoProfessionalTemplate data={data} design={design} hiddenSections={hiddenSections} />;
    case 'photo-creative':
      return <PhotoCreativeTemplate data={data} design={design} hiddenSections={hiddenSections} />;
    case 'ats-clean':
      return <ATSCleanTemplate data={data} design={design} hiddenSections={hiddenSections} />;
    case 'elegant':
      return <ElegantTemplate data={data} design={design} hiddenSections={hiddenSections} />;
    case 'classic':
    default:
      return <ClassicTemplate data={data} design={design} hiddenSections={hiddenSections} />;
  }
};
