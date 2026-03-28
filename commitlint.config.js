export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nueva feature
        'fix',      // Bug fix
        'docs',     // Documentación
        'style',    // Formato (sin cambio de lógica)
        'refactor', // Refactor (sin fix ni feature)
        'perf',     // Performance
        'test',     // Tests
        'build',    // Build system o dependencias
        'ci',       // CI/CD
        'chore',    // Tareas de mantenimiento
        'revert',   // Revert commit
      ],
    ],
    'subject-max-length': [2, 'always', 72],
  },
};
