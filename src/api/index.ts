import Api from '@/config/axios/index';
import type { ApiResponse, History } from '@/types/common';

const apiUrl = '/api/pubs'

function getAllTopics(): Promise<ApiResponse<any>> {
  return Api({
    method: 'GET',
    url: apiUrl,
  });
}

function getSingleTopic(topic: any): Promise<ApiResponse<History>> {
  return Api({
    method: 'GET',
    url: apiUrl + '/' + topic,
  });
}

export {
  getAllTopics,
  getSingleTopic,
};
