import { Router, Request, Response } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import { Pool } from '../models/pool';

const router = Router();
let pools: Pool[] = [];

const schema = {
    name: { isLength: { options: { min: 3 } } }
};

router.post('/', checkSchema(schema), (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const pool: Pool = {
        id: pools.length + 1,
        name: req.body.name,
        users: req.body.users
    };

    pools.push(pool);
    res.status(201).json(pool)
});



router.get('/', (req: Request, res: Response) => {
    res.json(pools);
});

router.get('/:id', (req: Request, res: Response) => {
    const pool = pools.find((t) => t.id === parseInt(req.params.id));

    if (!pool) {
        res.status(404).send('Pool not found');
    } else {
        res.json(pool);
    }
});

router.put('/:id', (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const pool = pools.find((t) => t.id === parseInt(req.params.id));

    if (!pool) {
        res.status(404).send('Pool not found');
    } else {
        pool.name = req.body.title || pool.name;
        pool.users = req.body.description || pool.users;

        res.json(pool);
    }

});

router.delete('/:id', (req: Request, res: Response) => {
    const index = pools.findIndex((t) => t.id === parseInt(req.params.id));

    if (index === -1) {
        res.status(404).send('Pool not found');
    } else {
        pools.splice(index, 1);
        res.status(204).send();
    }
});

export default router;