// Content registry — import all topic content here
// When you learn a new topic, create a file and import it below

import introToJs from './phase-1-javascript/module-1/intro-to-javascript';
import roleInWebDev from './phase-1-javascript/module-1/role-in-web-dev';
import jsEngineVsRuntime from './phase-1-javascript/module-1/js-engine-vs-runtime';
import howJsExecutes from './phase-1-javascript/module-1/how-js-executes';
import helloWorld from './phase-1-javascript/module-2/hello-world';
import variables from './phase-1-javascript/module-2/variables';
import primitiveTypes from './phase-1-javascript/module-2/primitive-types';
import operators from './phase-1-javascript/module-2/operators';
import typeCoercion from './phase-1-javascript/module-2/type-coercion';
import stackVsHeap from './phase-1-javascript/module-2/stack-vs-heap';

const allContent = [
  // Phase 1, Module 1
  introToJs,
  roleInWebDev,
  jsEngineVsRuntime,
  howJsExecutes,
  // Phase 1, Module 2
  helloWorld,
  variables,
  primitiveTypes,
  operators,
  typeCoercion,
  stackVsHeap,
];

// Helper: get content by topic slug
export function getTopicContent(slug) {
  return allContent.find(item => item.id === slug) || null;
}

// Helper: get all content for a specific module
export function getModuleContent(phaseId, moduleNum) {
  return allContent.filter(
    item => item.phase === phaseId && item.module === moduleNum
  );
}

// Helper: get all available content
export function getAllContent() {
  return allContent;
}

// Helper: get latest additions (sorted by date)
export function getLatestContent(limit = 5) {
  return [...allContent]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

// Helper: get content with struggle spots
export function getStruggleContent() {
  return allContent.filter(item => item.struggleSpot?.hasStruggle);
}

// Helper: search content
export function searchContent(query) {
  const q = query.toLowerCase();
  return allContent.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.overview.toLowerCase().includes(q) ||
    item.tags.some(tag => tag.toLowerCase().includes(q)) ||
    item.explanation.toLowerCase().includes(q)
  );
}

export default allContent;
