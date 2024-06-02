/* eslint-disable no-undef */
import {
  describe, expect, jest, it,
} from '@jest/globals';
import Activities from './activity.js';

global.fetch = jest.fn();
describe('Activities API', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('fetchActivities', () => {
    it('should return an object', async () => {
      const mockActivities = {
        total: 2,
        data: [{
          id: 1, name: 'activity1', met: 1.0, category_id: 1, created_at: '2024-05-27', updated_at: '2024-05-28',
        }, {
          id: 2, name: 'activity2', met: 2.0, category_id: 2, created_at: '2024-05-28', updated_at: null,
        }],
      };

      fetch.mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(mockActivities),
      }));

      const dataActivities = await Activities.fetchActivities();
      expect(typeof dataActivities).toBe('object');
      expect(dataActivities).toEqual(mockActivities);

      expect(dataActivities).toHaveProperty('total');
      expect(dataActivities).toHaveProperty('data');
      expect(Array.isArray(dataActivities.data)).toBe(true);
      expect(dataActivities.data.length).toBe(dataActivities.total);
      dataActivities.data.forEach((activity) => {
        expect(activity).toHaveProperty('id');
        expect(activity).toHaveProperty('name');
        expect(activity).toHaveProperty('met');
        expect(activity).toHaveProperty('category_id');
        expect(activity).toHaveProperty('created_at');
        expect(activity).toHaveProperty('updated_at');
      });
    });
  });

  describe('fetchActivity', () => {
    it('should return a single activity', async () => {
      const mockActivity = {
        data: {
          id: 1,
          name: 'Bicycling, mountain, uphill, vigorous',
          met: '14.0',
          category_id: 1,
          created_at: '2024-05-27T10:05:55.732Z',
          updated_at: null,
        },
      };

      fetch.mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockActivity),
      }));

      const dataActivity = await Activities.fetchActivity();
      expect(dataActivity).toEqual(mockActivity);
      expect(typeof dataActivity).toBe('object');

      expect(dataActivity).toHaveProperty('data');

      expect(dataActivity).toHaveProperty('data.id');
      expect(dataActivity).toHaveProperty('data.name');
      expect(dataActivity).toHaveProperty('data.met');
      expect(dataActivity).toHaveProperty('data.category_id');
      expect(dataActivity).toHaveProperty('data.created_at');
      expect(dataActivity).toHaveProperty('data.updated_at');
    });
  });

  describe('deleteActivity', () => {
    it('should return true when activity is deleted', async () => {
      const activityId = 1;

      fetch.mockImplementationOnce(() => Promise.resolve({
        ok: true,
      }));

      const result = await Activities.deleteActivity(activityId);
      expect(result).toBe(true);
      expect(fetch).toHaveBeenCalledWith(`http://localhost:4859/api/v1/activities/${activityId}`, { method: 'DELETE' });
    });
  });

  describe('postActivity', () => {
    it('should return created activity', async () => {
      const newActivity = { name: 'new activity' };
      const mockCreatedActivity = { id: 1, name: 'new activity' };

      fetch.mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(mockCreatedActivity),
      }));

      const result = await Activities.postActivity(newActivity);
      expect(result).toEqual(mockCreatedActivity);

      expect(fetch).toHaveBeenCalledWith('http://localhost:4859/api/v1/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivity),
      });
    });
  });

  describe('patchActivity', () => {
    it('should return updated activity', async () => {
      const activityId = 1;
      const updateData = { name: 'updated activity' };
      const mockUpdatedActivity = { id: 1, name: 'updated activity' };

      fetch.mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(mockUpdatedActivity),
      }));

      const result = await Activities.patchActivity(activityId, updateData);
      expect(result).toEqual(mockUpdatedActivity);

      expect(fetch).toHaveBeenCalledWith(`http://localhost:4859/api/v1/activities/${activityId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
    });
  });
});
