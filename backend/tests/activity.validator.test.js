const {
  validateActivity,
  isValidStatus,
} = require("../src/validators/activity.validator");

describe("Validación de actividades", () => {
  it("acepta una actividad válida", () => {
    const errors = validateActivity({
      title: "Construir imagen Docker",
      subject: "Desarrollo Web Integral",
      dueDate: "2026-08-05",
      priority: "alta",
      status: "pendiente",
    });

    expect(errors).toEqual([]);
  });

  it("rechaza una actividad sin campos obligatorios", () => {
    const errors = validateActivity({
      title: "",
      subject: "",
      dueDate: "",
      priority: "media",
      status: "pendiente",
    });

    expect(errors).toContain("El título es obligatorio");
    expect(errors).toContain("La materia es obligatoria");
    expect(errors).toContain(
      "La fecha de entrega es obligatoria"
    );
  });

  it("rechaza prioridad y estado desconocidos", () => {
    const errors = validateActivity({
      title: "Actividad",
      subject: "Desarrollo Web Integral",
      dueDate: "2026-08-05",
      priority: "urgente",
      status: "finalizada",
    });

    expect(errors).toContain(
      "La prioridad debe ser baja, media o alta"
    );

    expect(errors).toContain(
      "El estado debe ser pendiente, en_proceso o terminada"
    );
  });

  it("reconoce los estados permitidos", () => {
    expect(isValidStatus("pendiente")).toBe(true);
    expect(isValidStatus("en_proceso")).toBe(true);
    expect(isValidStatus("terminada")).toBe(true);
    expect(isValidStatus("cancelada")).toBe(false);
  });
});
