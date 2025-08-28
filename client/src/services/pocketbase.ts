import PocketBase from 'pocketbase'
import type { Guest } from '../types/guest'

// create and export pocketbase instance
export const pb = new PocketBase('http://127.0.0.1:8090')

const collection = () => pb.collection('guests');

// get guests list
export async function listGuests(search?: string): Promise<Guest[]> {
    const filter = search
    ? `first_name~"${search}" || last_name~"${search}" || email~"${search}" || phone~"${search}"`
    : '';
    const res = await collection().getList<Guest>(1, 50, { filter, sort: '-created' });
    return res.items;
}

// get guest by id
export async function getGuest(id: string): Promise<Guest> {
    return await collection().getOne<Guest>(id);
}

// save guest
export async function createGuest(data: Omit<Guest, 'id'|'created'|'updated'>): Promise<Guest> {
    return await collection().create<Guest>(data as any);
}

export async function updateGuest(id: string, data: Partial<Guest>): Promise<Guest> {
return await collection().update<Guest>(id, data as any);
}


export async function deleteGuest(id: string): Promise<void> {
await collection().delete(id);
}

