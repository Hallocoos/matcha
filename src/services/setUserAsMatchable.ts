import { retrieveUserById, modifyUserById } from '../models/userModel';
import { retrieveImagesByUserId } from '../models/imageModel';
import { retrieveTagsByUserId } from '../models/tagModel';
import { setUserAsMatchableValidator } from '../services/validation';

export async function checkUserMatchability(id) {
  let matchable = false;
  let user = await retrieveUserById(id);
  let images = await retrieveImagesByUserId(id);
  let tags = await retrieveTagsByUserId(id);
  let errors = await setUserAsMatchableValidator(user, images, tags);
  console.log(errors)
  if (!errors)
    matchable = true;
  user = await modifyUserById( {'id': id, 'matchable': matchable} );
  console.log(user)
  return (user);
}