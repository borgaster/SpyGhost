
import { SpyGhost } from './SpyGhost'

const ghost: SpyGhost = new SpyGhost();
ghost.init();
setTimeout( () => ghost.close(), 10000);