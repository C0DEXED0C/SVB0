import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';
import { getTradingData } from './utils/data_storage';

async function trainLSTMModel() {
  const data = getTradingData();
  const inputs = data.map(d => [d.open, d.close, d.high, d.low]);
  const labels = data.map(d => d.close);

  const inputTensor = tf.tensor3d(inputs.map(i => i.map(val => [val])), [inputs.length, 4, 1]);
  const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

  const model = tf.sequential();
  model.add(tf.layers.lstm({ units: 50, returnSequences: true, inputShape: [4, 1] }));
  model.add(tf.layers.lstm({ units: 50 }));
  model.add(tf.layers.dense({ units: 1 }));

  model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

  await model.fit(inputTensor, labelTensor, {
    epochs: 100,
    callbacks: tf.callbacks.earlyStopping({ monitor: 'loss' }),
  });

  await model.save('file://model');
}

trainLSTMModel();
