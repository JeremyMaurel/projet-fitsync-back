/* eslint-disable consistent-return */
export default class Activities {
  static async fetchActivities() {
    try {
      const response = await fetch('http://localhost:4859/api/v1/activities');
      const activities = await response.json();
      return activities;
    } catch (error) {
      console.log('Error fetching activity data:', error);
    }
  }

  static async fetchActivity() {
    try {
      const random = Math.floor(Math.random() * 1000) + 1;
      const response = await fetch(`http://localhost:4859/api/v1/activities/${random}`);
      const activity = await response.json();
      return activity;
    } catch (error) {
      console.log('Error fetching activity data:', error);
    }
  }

  static async deleteActivity(id) {
    try {
      const response = await fetch(`http://localhost:4859/api/v1/activities/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.log('Error deleting activity:', error);
    }
  }

  static async patchActivity(id, updateData) {
    try {
      const response = await fetch(`http://localhost:4859/api/v1/activities/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      const updatedActivity = await response.json();
      return updatedActivity;
    } catch (error) {
      console.log('Error updating activity:', error);
    }
  }

  static async postActivity(newActivity) {
    try {
      const response = await fetch('http://localhost:4859/api/v1/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivity),
      });
      const createdActivity = await response.json();
      return createdActivity;
    } catch (error) {
      console.log('Error creating activity:', error);
    }
  }
}
console.log(await Activities.fetchActivity());
