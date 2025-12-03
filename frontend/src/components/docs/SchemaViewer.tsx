export function SchemaViewer({ schema, schemas, isFormData = false }) {
  const resolveRef = (ref) => {
    if (!ref) return null;
    const schemaName = ref.split('/').pop();
    return schemas[schemaName];
  };

  const renderSchema = (schema, level = 0) => {
    if (schema.$ref) {
      const resolved = resolveRef(schema.$ref);
      if (!resolved) return null;
      return renderSchema(resolved, level);
    }

    if (schema.type === 'array') {
      return (
        <div className="ml-4">
          <div className="text-gray-400 text-sm mb-2">Array of:</div>
          {renderSchema(schema.items, level + 1)}
        </div>
      );
    }

    if (schema.type === 'object' && schema.properties) {
      return (
        <div className="space-y-2">
          {Object.entries(schema.properties).map(([key, value]) => {
            const isRequired = schema.required?.includes(key);
            const isNullable = value.anyOf?.some(v => v.type === 'null');
            
            return (
              <div key={key} className="bg-gray-750 border border-gray-600 rounded-lg p-3">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <code className="text-indigo-400">{key}</code>
                    {isRequired && (
                      <span className="text-xs px-2 py-0.5 bg-red-900/30 border border-red-700 text-red-400 rounded">
                        required
                      </span>
                    )}
                    {isNullable && (
                      <span className="text-xs px-2 py-0.5 bg-gray-700 border border-gray-600 text-gray-400 rounded">
                        nullable
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {value.type || (value.anyOf ? value.anyOf.find(v => v.type !== 'null')?.type : 'any')}
                    {value.format && ` (${value.format})`}
                  </span>
                </div>
                {value.title && <p className="text-sm text-gray-400">{value.title}</p>}
                {value.$ref && (
                  <div className="mt-2">
                    {renderSchema(resolveRef(value.$ref), level + 1)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="bg-gray-750 border border-gray-600 rounded-lg p-3">
        <span className="text-gray-400">{schema.type}</span>
        {schema.format && <span className="text-gray-500 ml-2">({schema.format})</span>}
      </div>
    );
  };

  return (
    <div>
      {isFormData && (
        <div className="mb-3 text-sm text-gray-400">
          Content-Type: <code className="text-indigo-400">application/x-www-form-urlencoded</code>
        </div>
      )}
      {renderSchema(schema)}
    </div>
  );
}
