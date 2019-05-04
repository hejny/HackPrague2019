import { createApp } from './createApp';
import { PORT } from './config';
import { logger } from './tools/logger';

const app = createApp();

app.listen(PORT, () => {
    console.log(
        `█████████████████████████████████████████████████████████████████████`,
    );
    logger.info(`API is running at http://localhost:${PORT}`);
});
