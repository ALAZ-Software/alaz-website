/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  let existing;
  try { existing = app.findCollectionByNameOrId('project_inquiries'); } catch (_) { existing = null; }
  if (existing) return;
  const collection = new Collection({
    type: 'base',
    name: 'project_inquiries',
    listRule: null,
    viewRule: null,
    createRule: '',
    updateRule: null,
    deleteRule: null,
    fields: [
      { name: 'project_type', type: 'select', required: true, maxSelect: 1, values: ['Web App', 'Mobile App', 'Infrastructure', 'Custom'] },
      { name: 'project_name', type: 'text', required: true, max: 160 },
      { name: 'brief', type: 'text', required: true, max: 5000 },
      { name: 'timeline', type: 'text', max: 120 },
      { name: 'budget', type: 'text', max: 120 },
      { name: 'name', type: 'text', required: true, max: 160 },
      { name: 'email', type: 'email', required: true },
      { name: 'company', type: 'text', max: 160 },
      { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
      { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
    ],
  });
  app.save(collection);
}, (app) => {
  app.delete(app.findCollectionByNameOrId('project_inquiries'));
});
