export const media = {
  earth: 'https://horizons-cdn.hostinger.com/1a631f12-80cd-4d30-a12d-eb3a1c5bb682/a97baae44687d408c5ec3f5358f4a507.png',
  server: 'https://images.hostinger.com/b7153917-045b-4d9f-a8e9-d3267bf93605.png',
  wafer: 'https://images.hostinger.com/79819ca9-2b4f-40a0-b628-39c7e7abb02c.png',
  conduits: 'https://images.hostinger.com/34b5c8dc-aea2-4a15-a1ea-7d23314bd149.png',
  laboratory: 'https://images.hostinger.com/5409df7a-b8d7-46c1-935f-e8bb5f9de990.png',
};

export const services = [
  { number: '01', title: 'SYSTEM ARCHITECTURE', category: 'INFRASTRUCTURE / RESILIENCE', description: 'Resilient, observable infrastructure for systems that cannot afford to go down.', detail: 'From the first service diagram to production, we design for clarity and scale. Every dependency is deliberate, every failure mode mapped, every deploy reversible.' },
  { number: '02', title: 'NATIVE PERFORMANCE', category: 'ENGINEERING / OPTIMIZATION', description: 'Sub-second loads and zero jank. We cut bytes and main-thread work, not corners.', detail: 'We profile the real critical path, prune the bundle, and move rendering to the server. The result ships fewer kilobytes and responds on the first interaction.' },
  { number: '03', title: 'DIGITAL ECOSYSTEMS', category: 'INTEGRATION / PRODUCT', description: 'APIs, data flows, and product surfaces wired into one coherent system.', detail: 'Complexity belongs behind the interface. We connect products, data, and workflows with typed contracts and clear boundaries, so the system stays legible as it grows.' },
];

export const projects = [
  { slug: 'alpha', number: '01', name: 'ALPHA', discipline: 'SYSTEM DESIGN', type: 'CLOUD INFRASTRUCTURE', image: media.server, summary: 'A cloud foundation rebuilt for zero-downtime migration and horizontal scale.', challenge: 'Replace a fragmented infrastructure layer with a fault-tolerant platform, without taking business-critical services offline.', approach: 'We mapped every service dependency, stood up an observable deployment pipeline, and cut an incremental migration path with rollback at each stage.', outcome: 'A zero-downtime cutover strategy and a foundation that absorbs new workloads without rework.', markers: ['ZERO-DOWNTIME STRATEGY', 'FAULT-TOLERANT DESIGN', 'OBSERVABLE SYSTEMS'] },
  { slug: 'beta', number: '02', name: 'BETA', discipline: 'NATIVE PERFORMANCE', type: 'SILICON LOGIC', image: media.wafer, summary: 'The critical path profiled and trimmed for sub-second interaction.', challenge: 'Locate the friction between hardware limits, application logic, and what the user actually waits on.', approach: 'We profiled the computational hot paths, simplified the execution model, and moved rendering off the client where it did not need to be.', outcome: 'A focused optimization blueprint: leaner computation, fewer shipped bytes, and interactions that respond on the first event.', markers: ['EXECUTION PATH AUDIT', 'LOGIC OPTIMIZATION', 'PERFORMANCE-FIRST UI'] },
];
