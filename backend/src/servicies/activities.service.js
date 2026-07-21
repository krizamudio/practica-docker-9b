const pool = require("../config/database");

const getAllActivities = async () => {
  const query = `
    SELECT
      id,
      title,
      subject,
      due_date,
      priority,
      status,
      created_at,
      updated_at
    FROM activities
    ORDER BY due_date ASC, id ASC
  `;

  const result = await pool.query(query);
  return result.rows;
};

const getActivityById = async (id) => {
  const query = `
    SELECT
      id,
      title,
      subject,
      due_date,
      priority,
      status,
      created_at,
      updated_at
    FROM activities
    WHERE id = $1
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const createActivity = async ({
  title,
  subject,
  dueDate,
  priority,
  status,
}) => {
  const query = `
    INSERT INTO activities (
      title,
      subject,
      due_date,
      priority,
      status
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [
    title,
    subject,
    dueDate,
    priority || "media",
    status || "pendiente",
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const updateActivity = async (
  id,
  { title, subject, dueDate, priority, status }
) => {
  const query = `
    UPDATE activities
    SET
      title = $1,
      subject = $2,
      due_date = $3,
      priority = $4,
      status = $5,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
    RETURNING *
  `;

  const values = [
    title,
    subject,
    dueDate,
    priority,
    status,
    id,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const updateActivityStatus = async (id, status) => {
  const query = `
    UPDATE activities
    SET
      status = $1,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *
  `;

  const result = await pool.query(query, [status, id]);
  return result.rows[0];
};

const deleteActivity = async (id) => {
  const query = `
    DELETE FROM activities
    WHERE id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  updateActivityStatus,
  deleteActivity,
};